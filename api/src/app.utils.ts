const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MSG = 'Your password must have at least 8 characters, with 1 upper case, 1 lowcase, 1 number and 1 special character';

export const REGEX = {
    PASSWORD_RULE,
}

export const MESSAGES = {
    PASSWORD_RULE_MSG,
}