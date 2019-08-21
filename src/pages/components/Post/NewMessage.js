import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Formik, Form } from 'formik'
import { string, object } from 'yup'

const mutation = gql`
  mutation($post: ID!, $comment: Message!) {
    commentPost(comment: { post: $post, comment: $comment }) {
      _id
    }
  }
`

export function NeWMessage ({ id }) {
  const [sendMessage, { data, loading, error }] = useMutation(mutation)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  if (!data.commentPost) return <div>Post not found</div>

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
      onSubmit={({ message }) => {
        sendMessage({ message, post: id })
      }}
      // render={()}
    >
      a
    </Formik>
  )
}
