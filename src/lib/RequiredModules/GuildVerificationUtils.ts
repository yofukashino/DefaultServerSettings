import { webpack } from "replugged";

export type FormFields = [
  {
    field_type: string;
    label: string;
    required: boolean;
    response?: boolean;
    values?: string[];
  },
];

export interface Form {
  description: string;
  form_fields?: FormFields;
  formFields?: FormFields;

  version: string;
}

export interface GuildVerificationUtils {
  fetchVerificationForm: (guildId: string) => Promise<Form>;
  submitVerificationForm: (guildId: string, form: Form) => Promise<void>;
}

export default await webpack
  .waitForProps<GuildVerificationUtils>(["submitVerificationForm"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find GuildVerificationUtils Module");
  });
