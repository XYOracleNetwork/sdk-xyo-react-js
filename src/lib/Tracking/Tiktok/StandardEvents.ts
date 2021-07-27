import StandardEvent from './StandardEvent'

export class TiktokStandardEvents<T> {
  public pageView() {
    return new StandardEvent<T>('Browse')
  }

  public viewContent() {
    return new StandardEvent<T>('ViewContent')
  }

  public addToCart() {
    return new StandardEvent<T>('AddToCart')
  }

  public checkout() {
    return new StandardEvent<T>('Checkout')
  }

  public purchase() {
    return new StandardEvent<T>('Purchase')
  }

  public registration() {
    return new StandardEvent<T>('Registration')
  }

  public startCheckout() {
    return new StandardEvent<T>('StartCheckout')
  }

  public addBilling() {
    return new StandardEvent<T>('AddBilling')
  }

  public search() {
    return new StandardEvent<T>('Search')
  }

  public viewForm() {
    return new StandardEvent<T>('ViewForm')
  }

  public clickForm() {
    return new StandardEvent<T>('ClickForm')
  }

  public submitForm() {
    return new StandardEvent<T>('SubmitForm')
  }

  public viewDownloadPage() {
    return new StandardEvent<T>('ViewDownloadPage')
  }

  public clickInDownloadPage() {
    return new StandardEvent<T>('ClickInDownloadPage')
  }

  public clickToDownload() {
    return new StandardEvent<T>('ClickToDownload')
  }

  public clickButton() {
    return new StandardEvent<T>('ClickButton')
  }
}
