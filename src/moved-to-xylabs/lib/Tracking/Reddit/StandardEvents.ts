import StandardEvent from './StandardEvent'

class RedditStandardEvents<T extends Record<string, unknown>> {
  public pageView() {
    return new StandardEvent<T>('PageView')
  }

  public viewContent() {
    return new StandardEvent<T>('ViewContent')
  }

  public addToCart() {
    return new StandardEvent<T>('AddToCart')
  }

  public addToWishlist() {
    return new StandardEvent<T>('AddToWishlist')
  }

  public purchase() {
    return new StandardEvent<T>('Purchase')
  }

  public signup() {
    return new StandardEvent<T>('SignUp')
  }

  public lead() {
    return new StandardEvent<T>('Lead')
  }

  public search() {
    return new StandardEvent<T>('Search')
  }
}

export default RedditStandardEvents
