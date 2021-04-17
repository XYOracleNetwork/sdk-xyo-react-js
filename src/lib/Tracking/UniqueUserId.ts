import randomBytes from 'randombytes'

class UniqueUserId {
  private static localStorageId = '_coin_cid'
  public id: string
  constructor() {
    this.id = localStorage.getItem(UniqueUserId.localStorageId) ?? this.generateId()
    localStorage.setItem(UniqueUserId.localStorageId, this.id)
  }
  private generateId() {
    return randomBytes(16).toString('base64')
  }

  public toString() {
    return this.id
  }
}

export default UniqueUserId
