/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { render } from 'react-dom'
import { Field } from 'react-final-form'
import Wizard from './FormWizard'
import { Container } from 'react-bootstrap'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
)

const required = value => (value ? undefined : 'Required')

const FormComponent = () => (
    <Container className="formContainer">
        <h2>TITLE</h2>
        <Wizard
            onSubmit={onSubmit}
        >
            <Wizard.Page
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.email = 'Required'
                    }
                    if (!values.favoriteColor) {
                        errors.favoriteColor = 'Required'
                    }
                    return errors
                }}
            >
                <div>
                    <label>First Name</label>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        validate={required}
                    />
                    <Error name="firstName" />
                </div>
                <div>
                    <label>Last Name</label>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                        validate={required}
                    />
                    <Error name="lastName" />
                </div>
                <div>
                    <label>Email</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                    />
                    <Error name="email" />
                </div>
            </Wizard.Page>
            <Wizard.Page>
                <div>
                    <label>Favorite Color</label>
                    <Field name="favoriteColor" component="select">
                        <option />
                        <option value="#ff0000">❤️ Red</option>
                        <option value="#00ff00">💚 Green</option>
                        <option value="#0000ff">💙 Blue</option>
                    </Field>
                    <Error name="favoriteColor" />
                </div>
            </Wizard.Page>
            <Wizard.Page
                validate={values => {
                    const errors = {}
                    if (!values.toppings) {
                        errors.toppings = 'Required'
                    } else if (values.toppings.length < 2) {
                        errors.toppings = 'Choose more'
                    }
                    return errors
                }}
            >
                <div>
                    <label>Employed?</label>
                    <Field name="employed" component="input" type="checkbox" />
                </div>
                <div>
                    <label>Toppings</label>
                    <Field name="toppings" component="select" multiple>
                        <option value="ham">🐷 Ham</option>
                        <option value="mushrooms">🍄 Mushrooms</option>
                        <option value="cheese">🧀 Cheese</option>
                        <option value="chicken">🐓 Chicken</option>
                        <option value="pineapple">🍍 Pinapple</option>
                    </Field>
                    <Error name="toppings" />
                </div>
            </Wizard.Page>
            <Wizard.Page
                validate={values => {
                    const errors = {}
                    if (!values.notes) {
                        errors.notes = 'Required'
                    }
                    return errors
                }}
            >
                <div>
                    <label>Best Stooge?</label>
                    <div>
                        <label>
                            <Field
                                name="stooge"
                                component="input"
                                type="radio"
                                value="larry"
                            />{' '}
                        Larry
                        </label>
                        <label>
                            <Field name="stooge" component="input" type="radio" value="moe" />{' '}
                        Moe
                        </label>
                        <label>
                            <Field
                                name="stooge"
                                component="input"
                                type="radio"
                                value="curly"
                            />{' '}
                        Curly
                        </label>
                    </div>
                </div>
                <div>
                    <label>Notes</label>
                    <Field name="notes" component="textarea" placeholder="Notes" />
                    <Error name="notes" />
                </div>
            </Wizard.Page>
        </Wizard>
    </Container>

)

export default FormComponent;
