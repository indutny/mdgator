import { Test } from './test';

export class Group {
  constructor(public readonly name: string,
              public readonly line: number,
              public readonly children: ReadonlyArray<Group>,
              public readonly tests: ReadonlyArray<Test>) {
  }

  public toJSON(): any {
    return {
      children: this.children,
      line: this.line,
      name: this.name,
      tests: this.tests,
    };
  }
}
