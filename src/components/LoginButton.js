import React, { useState } from 'react'
import { useAuthState } from '../hooks/Firebase'
import { Group, TextInput, PasswordInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  fetchSignInMethodsForEmail,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth'

const LoginButton = () => {
  const { user, isAuthenticated } = useAuthState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = getAuth()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const submitForm = async (values) => {
    setLoading(true)
    fetchSignInMethodsForEmail(auth, values.email).then(async (value) => {
      if (value.length >= 1) {
        //attempt login this email has an account
        await signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            setError(err.message)
          })
      } else {
        //attempt account creation this email has never been used for an account
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        )
          .then((data) => {
            setLoading(false)
          })
          .catch((err) => {
            console.log(err.message)
            setLoading(false)
            setError(err.message)
          })
      }
    })
  }

  if (!isAuthenticated) {
    return (
      <div>
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Group align="center">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              error={error}
              disabled={loading}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              disabled={loading}
              style={{ width: 200 }}
              {...form.getInputProps('password')}
            />
            <Button loading={loading} type="submit">
              Login
            </Button>
          </Group>
        </form>
      </div>
    )
  } else {
    console.log(user)
    return (
      <Group align="center" style={{ height: '100%' }}>
        <div>You are logged in as {user?.email}, nice job bro</div>
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </Group>
    )
  }
}

export default LoginButton
