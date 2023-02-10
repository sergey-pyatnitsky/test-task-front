interface ErrorProps {
  message: string
  response:{
    status: number
    data:{
      error: string
    }
  }
}

export default ErrorProps;