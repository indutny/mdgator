import * as Markdown from 'markdown-it';
import { Group } from './group';
import { Test } from './test';

export type State = 'none' | 'heading';

interface IHeading {
  readonly children: IHeading[];
  readonly content: Map<string, string[]>;
  readonly line: number;
  readonly name: string;
}

export { Group, Test };

export class MDGator {
  private readonly md = new Markdown();
  private state: State = 'none';

  public parse(text: string): ReadonlyArray<Group> {
    const tokens = this.md.parse(text, {});

    const roots: IHeading[] = [];

    const stack: IHeading[] = [];
    for (const token of tokens) {
      const type = token.type;

      if (type === 'heading_open') {
        this.state = 'heading';

        // Leave previous headings
        const depth = parseInt(token.tag.slice(1), 10) - 1;
        while (stack.length > depth) {
          stack.pop();
        }
      } else if (type === 'heading_close') {
        this.state = 'none';
      } else if (type === 'inline') {
        if (this.state !== 'heading') {
          continue;
        }

        const heading = {
          children: [],
          content: new Map(),
          line: token.map[0],
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
    return new Test(heading.name, heading.line, heading.content);
  }
}
