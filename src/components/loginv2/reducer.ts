
export const actions = {
    emailChanged: 'EMAIL_CHANGED',
    formSubmitted: 'FORM_SUBMITTED',
}

export function formReducer(state: any, action: any) {
    let error
    switch (state.status) {
        case 'dirty':
            switch (action.type) {
                case actions.formSubmitted:
                    let formValid = true
                    let emailError = validate('email', state.email)
                    if (emailError || !state.email) {
                        formValid = false
                    }
                    return {
                        ...state,
                        emailError,
                        submitAttempted: true,
                        status: formValid ? 'completed' : 'dirty',
                        submitMessage: formValid
                            ? 'Form Submitted Successfully'
                            : 'Form Has Errors',
                    }
            };
        // no 'break' or 'return', case 'dirty' continues!
        // eslint-disable-next-line no-fallthrough
        case 'clean':
            switch (action.type) {
                case actions.emailChanged:
                    error = validate('email', action.payload)
                    return {
                        ...state,
                        email: action.payload,
                        emailError: error,
                        submitMessage: '',
                        status: 'dirty',
                    }
                case actions.formSubmitted:
                    return {
                        ...state,
                        submitMessage: 'Please fill out the form',
                    }
                default:
                    return state
            }
        case 'completed':
        // no 'break' or 'return', case 'completed' continues!
        // eslint-disable-next-line no-fallthrough
        default:
            return state
    }
}

function validate(name: any, value: any) {
    if (typeof value === 'string') value = value.trim()

    if (value.length === 0) {
        return 'Must enter email'
    } else if (
        !value.includes('@') ||
        !value.includes('.') ||
        value.split('.')[1].length < 2
    ) {
        return 'Must enter valid email'
    } else {
        return null
    }
}
