import * as Markdown from 'markdown-it';
import { Group } from './group';
import { Metadata, Test } from './test';

export type State = 'none' | 'heading';

interface IHeading {
  readonly children: IHeading[];
  readonly content: Map<string, string[]>;
  readonly line: number;
  readonly meta: Map<string, Metadata[]>;
  readonly name: string;
}

export { Group, Metadata, Test };

export class MDGator {
  private readonly md = new Markdown({ html: true });
  private state: State = 'none';

  public parse(text: string): ReadonlyArray<Group> {
    const tokens = this.md.parse(text, {});

    const roots: IHeading[] = [];

    const stack: IHeading[] = [];
    let metadata: Metadata | undefined;
    for (const token of tokens) {
      const type = token.type;

      if (type === 'heading_open') {
        this.state = 'heading';
        metadata = undefined;

        // Leave previous headings
        const depth = parseInt(token.tag.slice(1), 10) - 1;
        while (stack.length > depth) {
          stack.pop();
        }
      } else if (type === 'heading_close') {
        this.state = 'none';
        metadata = undefined;
      } else if (type === 'inline') {
        if (this.state !== 'heading') {
          continue;
        }

        const heading = {
          children: [],
          content: new Map(),
          line: token.map[0],
          meta: new Map(),
          name: token.content,
        };

        if (stack.length === 0) {
          roots.push(heading);
        } else {
          stack[stack.length - 1].children.push(heading);
        }

        stack.push(heading);
      } else if (type === 'fence' && stack.length > 1) {
        const current = stack[stack.length - 1];

        if (!current.content.has(token.info)) {
          current.content.set(token.info, []);
        }
        current.content.get(token.info)!.push(token.content);

        // Set metadata
        if (metadata !== undefined) {
          if (!current.meta.has(token.info)) {
            current.meta.set(token.info, []);
          }
          current.meta.get(token.info)!.push(metadata);
          metadata = undefined;
        }
      } else if (type === 'html_block' && stack.length >= 1) {
        const match = token.content.match(/<!--\s+meta=(.*)\s+-->/);
        if (match === null) {
          continue;
        }

        let json: Metadata;
        try {
          json = JSON.parse(match[1]);
        } catch (e) {
          throw new Error(`Failed to parse JSON metadata: "${match[1]}"`);
        }

        metadata = json;
      }
    }

    return roots.map((root) => this.translate(root));
  }

  private translate(heading: IHeading): Group {
    const children = heading.children.filter((child) => {
      return child.children.length !== 0;
    }).map((child) => this.translate(child));

    const tests = heading.children.filter((child) => {
      return child.content.size !== 0;
    }).map((child) => this.translateTest(child));

    return new Group(heading.name, heading.line, children, tests);
  }

  private translateTest(heading: IHeading): Test {
    return new Test(heading.name, heading.line, heading.content, heading.meta);
  }
}
