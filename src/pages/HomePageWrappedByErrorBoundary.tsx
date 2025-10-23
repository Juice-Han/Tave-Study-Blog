import { ErrorBoundary } from 'react-error-boundary'
import HomePage from './HomePage'

function HomePageWrappedByErrorBoundary() {
  const fallbackRender = ({
    error,
    resetErrorBoundary,
  }: {
    error: Error
    resetErrorBoundary: () => void
  }) => {
    return (
      <div role='alert'>
        <p>문제가 발생했습니다.</p>
        <pre>{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className='border bg-blue-700 text-white'
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={() => console.log('reset')}
    >
      <HomePage />
    </ErrorBoundary>
  )
}

export default HomePageWrappedByErrorBoundary
