export default interface RegistrationFormData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    termsAccepted?: boolean;
};