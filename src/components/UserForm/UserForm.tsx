import { useFormInput } from "../../hooks/useFormInput";
import { Gender, User } from "../../types/User";
import DateInput from "../DateInput/DateInput";
import SelectInput from "../SelectInput/SelectInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import TextInput from "../TextInput/TextInput";

type UserFormProps = {
  user: User | undefined;
  onSubmit: (user: User) => void;
};

function UserForm({ user, onSubmit }: UserFormProps) {
  console.log(user?.name);
  const userNameProps = useFormInput(user?.name ?? "", true);
  const dobProps = useFormInput(user?.dob ?? "", true);
  const genderProps = useFormInput(user?.gender ?? "", true);
  const emailProps = useFormInput(user?.email ?? "", true);
  const addressProps = useFormInput(user?.address ?? "", true);
  const telephoneProps = useFormInput(user?.phone ?? "", true);
  const websiteProps = useFormInput(user?.web ?? "", true);

  function convertStringToGender(value: string): Gender {
    switch (value) {
      case "Männlich":
        return Gender.MALE;
      case "Weiblich":
        return Gender.FEMALE;
      case "Divers":
        return Gender.OTHER;
      default:
        return Gender.NONE;
    }
  }

  function isValidInputs(): boolean {
    const isUserNameValid = userNameProps.validateInput(userNameProps.value);
    const isDobValid = dobProps.validateInput(dobProps.value);
    console.log(genderProps.value);
    const isGenderValid = genderProps.validateInput(
      convertStringToGender(genderProps.value)
    );
    const isEmailValid = emailProps.validateInput(emailProps.value);
    const isAddressValid = addressProps.validateInput(addressProps.value);
    const isTelehoneValid = telephoneProps.validateInput(telephoneProps.value);
    const isWebsiteValid = websiteProps.validateInput(websiteProps.value);
    return (
      isUserNameValid &&
      isDobValid &&
      isGenderValid &&
      isEmailValid &&
      isAddressValid &&
      isTelehoneValid &&
      isWebsiteValid
    );
  }

  function handleSubmitUser() {
    if (isValidInputs()) {
      const submittedUser: User = {
        id: user?.id ?? Math.random(),
        name: userNameProps.value,
        dob: dobProps.value,
        gender: convertStringToGender(genderProps.value),
        email: emailProps.value,
        address: addressProps.value,
        phone: telephoneProps.value,
        web: websiteProps.value,
      };
      onSubmit(submittedUser);
    } else {
      alert("Bitte Informationen ergänzen");
    }
  }

  return (
    <div className="input-form-container">
      <div className="input-container">
        <span className="input-title">Username</span>
        <TextInput
          value={userNameProps.value}
          onChange={userNameProps.handleInputChangeEvent}
          error={userNameProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Geburtsdatum</span>
        <DateInput
          value={dobProps.value}
          onChange={dobProps.handleInputChangeEvent}
          error={dobProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Geschlecht</span>
        <SelectInput
          value={genderProps.value}
          onChange={genderProps.handleInputChangeEvent}
          options={["", "Männlich", "Weiblich", "Divers"]}
          error={genderProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Email Adresse</span>
        <TextInput
          value={emailProps.value}
          onChange={emailProps.handleInputChangeEvent}
          error={emailProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Post Adresse</span>
        <TextInput
          value={addressProps.value}
          onChange={addressProps.handleInputChangeEvent}
          error={addressProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Telefonnummer</span>
        <TextInput
          value={telephoneProps.value}
          onChange={telephoneProps.handleInputChangeEvent}
          error={telephoneProps.error}
        />
      </div>
      <div className="input-container">
        <span className="input-title">Webseite</span>
        <TextInput
          value={websiteProps.value}
          onChange={websiteProps.handleInputChangeEvent}
          error={websiteProps.error}
        />
      </div>
      <SubmitButton onClick={handleSubmitUser} />
    </div>
  );
}

export default UserForm;
