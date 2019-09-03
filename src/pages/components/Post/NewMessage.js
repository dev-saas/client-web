import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'
import { Input } from '../Form/Input'
import { useTranslation } from 'react-i18next'
import { ButtonLoad } from '../'

const mutation = gql`
  mutation($post: ID!, $message: Message!) {
    commentPost(comment: { post: $post, message: $message }) {
      _id
    }
  }
`

export function NewMessage ({ id }) {
  const [sendMessage, { data, loading, error }] = useMutation(mutation)
  const { t } = useTranslation()

  // if (loading) return <div>sending</div>

  // if (error) return <div>{error.message}</div>

  // if (!data.commentPost) return <div>Post not found</div>

  return (
    <Formik
      initialValues={{
        message: ''
      }}
      validationSchema={object().shape({
        message: string()
          .required('required')
          .max(256, 'max len')
      })}
      onSubmit={async ({ message }, { resetForm }) => {
        await sendMessage({ variables: { message, post: id } })
        resetForm()
      }}
      render={() =>
        <Form>
          <Input
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('message:New Message')}
            autoFocus
            id="message"
            name="message"
          />
          <ButtonLoad
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            loading={loading}>
            {t('Message:Send')}
          </ButtonLoad>
        </Form>
      }
    >
    </Formik>
  )
}
