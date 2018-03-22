export class Test {
  constructor(public readonly name: string,
              public readonly line: number,
              public readonly values
                : ReadonlyMap<string, ReadonlyArray<string> >) {
  }

  public toJSON(): any {
    const values: { [key: string]: ReadonlyArray<string> } = {};

    this.values.forEach((value, key) => {
      values[key] = value;
    });

    return {
      line: this.line,
      name: this.name,
      values,
    };
  }
}
