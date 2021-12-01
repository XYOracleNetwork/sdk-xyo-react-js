import StandardEvent from './StandardEvent'
import SnapchatStandardProperties from './StandardProperties'

export class SnapchatStandardEvents<T extends SnapchatStandardProperties> {
  public pageView() {
    return new StandardEvent<T>('PAGE_VIEW')
  }
  public signUp() {
    return new StandardEvent<T>('SIGN_UP')
  }
  public purchase() {
    return new StandardEvent<T>('PURCHASE')
  }
  public save() {
    return new StandardEvent<T>('SAVE')
  }
  public startCheckout() {
    return new StandardEvent<T>('START_CHECKOUT')
  }
  public addCart() {
    return new StandardEvent<T>('ADD_CART')
  }
  public openApp() {
    return new StandardEvent<T>('OPEN_APP')
  }
  public viewContent() {
    return new StandardEvent<T>('VIEW_CONTENT')
  }
  public addBilling() {
    return new StandardEvent<T>('ADD_BILLING')
  }
  public search() {
    return new StandardEvent<T>('SEARCH')
  }
  public subscribe() {
    return new StandardEvent<T>('SUBSCRIBE')
  }
  public adClick() {
    return new StandardEvent<T>('AD_CLICK')
  }
  public adView() {
    return new StandardEvent<T>('AD_VIEW')
  }
  public completeTutorial() {
    return new StandardEvent<T>('COMPLETE_TUTORIAL')
  }
  public invite() {
    return new StandardEvent<T>('INVITE')
  }
  public login() {
    return new StandardEvent<T>('LOGIN')
  }
  public share() {
    return new StandardEvent<T>('SHARE')
  }
  public reserve() {
    return new StandardEvent<T>('RESERVE')
  }
  public achievementUnlocked() {
    return new StandardEvent<T>('ACHIEVEMENT_UNLOCKED')
  }
  public addToWishlist() {
    return new StandardEvent<T>('ADD_TO_WISHLIST')
  }
  public spentCredits() {
    return new StandardEvent<T>('SPENT_CREDITS')
  }
  public rate() {
    return new StandardEvent<T>('RATE')
  }
  public startTrial() {
    return new StandardEvent<T>('START_TRIAL')
  }
  public listView() {
    return new StandardEvent<T>('LIST_VIEW')
  }
  public custom1() {
    return new StandardEvent<T>('CUSTOM_EVENT_1')
  }
  public custom2() {
    return new StandardEvent<T>('CUSTOM_EVENT_2')
  }
  public custom3() {
    return new StandardEvent<T>('CUSTOM_EVENT_3')
  }
  public custom4() {
    return new StandardEvent<T>('CUSTOM_EVENT_4')
  }
  public custom5() {
    return new StandardEvent<T>('CUSTOM_EVENT_5')
  }
}
