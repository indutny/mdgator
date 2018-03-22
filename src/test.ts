export type Metadata = any;

export class Test {
  constructor(public readonly name: string,
              public readonly line: number,
              public readonly values
                : ReadonlyMap<string, ReadonlyArray<string> >,
              public readonly meta
                : ReadonlyMap<string, ReadonlyArray<Metadata> >) {
  }

  public toJSON(): any {
    const values: { [key: string]: ReadonlyArray<string> } = {};
    this.values.forEach((value, key) => {
      values[key] = value;
    });

    const meta: { [key: string]: ReadonlyArray<Metadata> } = {};
    this.meta.forEach((mvalue, key) => {
      meta[key] = mvalue;
    });

    return {
      line: this.line,
      meta,
      name: this.name,
      values,
    };
  }
}
