import PartialBy from './partial-by.type';

interface BaseFormDataValueConfig {
  path: Array<string>;
  /** An override if the value should have a significantly different name than its key. */
  label: string;
}

interface StringFormDataValueConfig extends BaseFormDataValueConfig {
  type: 'string';
}

interface NumberFormDataValueConfig extends BaseFormDataValueConfig {
  type: 'number';
}

interface BooleanFormDataValueConfig extends BaseFormDataValueConfig {
  type: 'boolean';
}

export type FormMetadataValueConfig =
  | StringFormDataValueConfig
  | NumberFormDataValueConfig
  | BooleanFormDataValueConfig;

class FormDataValue {
  constructor(public config: FormMetadataValueConfig, public value?: any) {}

  clone(value?: any): FormDataValue {
    return new FormDataValue(this.config, value ?? this.value);
  }
}

type ClientFormMetadataValueConfig = PartialBy<
  Omit<FormMetadataValueConfig, 'path'>,
  'label'
>;

export default interface FormMetadataConfig {
  [key: string]: FormMetadataConfig | ClientFormMetadataValueConfig;
}

export class FormMetadata {
  public config: { [key: string]: FormMetadata | FormDataValue };

  constructor(
    config: FormMetadataConfig,
    values?: { [key: string]: { [key: string]: any } | any },
    currentPath: Array<string> = []
  ) {
    this.config = {};

    for (const [key, value] of Object.entries(config)) {
      if (this.isFormMetadataValueConfig(value)) {
        const newPath = currentPath.concat(key);

        const formDataValue = new FormDataValue({
          ...value,
          label: value.label ?? newPath.join('.'),
          path: newPath,
        });

        formDataValue.value = values?.[key];

        this.config[key] = formDataValue;
      } else {
        this.config[key] = new FormMetadata(value, values?.[key], [key]);
      }
    }
  }

  /**
   * @returns null if the form is finished.
   */
  getNextQuestionPrompt(): FormDataValue | null {
    // Only checks if value is neither null nor undefined.
    for (const formValue of Object.values(this.config)) {
      if (formValue instanceof FormDataValue) {
        if (this.isNotDefined(formValue.value)) {
          return formValue;
        }
      } else {
        const nextQuestion = formValue.getNextQuestionPrompt();
        if (nextQuestion !== null) {
          return nextQuestion;
        }
      }
    }

    return null;
  }

  private isNotDefined(value: unknown): boolean {
    return value === null || value === undefined;
  }

  private isFormMetadataValueConfig(
    value: unknown
  ): value is ClientFormMetadataValueConfig {
    if (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      typeof value.type === 'string'
    ) {
      const validTypes = new Set(['string', 'number', 'boolean']);

      return validTypes.has(value.type);
    } else {
      return false;
    }
  }
}
