export const actions = {
    titleChanged: 'titleChanged',
    emailChanged: 'emailChanged',
    nameChanged: 'nameChanged',
    formSubmitted: 'FORM_SUBMITTED',
}

export const initialState = {
    title: '',
    email: '',
    name: '',
    titleError: null,
    emailError: null,
    nameError: null,
    submitAttempted: false,
    submitMessage: '',
    status: 'clean',
}

export function formReducer(state: any, action: any) {
    let error
    switch (state.status) {
        case 'dirty':
            switch (action.type) {
                case actions.formSubmitted:
                    let formValid = true
                    let titleError = validate('title', state.title)
                    let emailError = validate('email', state.email)
                    if (titleError || !state.title || emailError || !state.email) {
                        formValid = false
                    }
                    return {
                        ...state,
                        titleError,
                        emailError,
                        submitAttempted: true,
                        status: formValid ? 'completed' : 'dirty',
                        submitMessage: formValid
                            ? 'Form Submitted Successfully'
                            : 'Form Has Errors',
                    }
            }
        // no 'break' or 'return', case 'dirty' continues!
        // eslint-disable-next-line no-fallthrough
        case 'clean':
            switch (action.type) {

                case actions.titleChanged:
                    error = validate('title', action.payload)
                    return {
                        ...state,
                        title: action.payload,
                        titleError: error,
                        submitMessage: '',
                        status: 'dirty',
                    }
                case actions.emailChanged:
                    error = validate('email', action.payload)
                    return {
                        ...state,
                        email: action.payload.toLowerCase(),
                        emailError: error,
                        submitMessage: '',
                        status: 'dirty',
                    }
                case actions.nameChanged:
                    error = validate('name', action.payload)
                    return {
                        ...state,
                        name: action.payload,
                        nameError: error,
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
    switch (name) {
        case 'title':
            if (value.length === 0) {
                return 'Must enter title'
            } else {
                return null
            }
        case 'name':
            if (value.length === 0) {
                return 'Must enter name'
            } else {
                return null
            }
        case 'email':
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
}