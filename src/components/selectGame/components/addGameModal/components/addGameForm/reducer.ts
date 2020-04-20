export const actions = {
    titleChanged: 'titleChanged',
    emailChanged: 'emailChanged',
    formSubmitted: 'FORM_SUBMITTED',
}

export const initialState = {
    title: '',
    email: 'philvancaloen@gmail.com',
    titleError: null,
    emailError: null,
    submitAttempted: false,
    submitMessage: '',
    status: 'clean',
}

export function formReducer(state: any, action: any) {
    console.log('hello', action)
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
                    console.log('title changed')
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
            break
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
            break
    }
}