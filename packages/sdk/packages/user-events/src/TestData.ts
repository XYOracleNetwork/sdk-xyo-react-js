export class TestData {
  private static localStorageId = 'testData'
  data: string
  constructor() {
    this.data = localStorage.getItem(TestData.localStorageId) ?? ''
  }

  toString() {
    return this.data
  }
}
