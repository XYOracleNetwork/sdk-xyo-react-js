import isEqual from 'lodash/isEqual'

class UtmFields {
  private static localStorageId = '_coin_utm'
  public fields: Record<string, string>[] = []
  constructor() {
    const storedString = localStorage.getItem(UtmFields.localStorageId) ?? '[]'
    try {
      this.fields = JSON.parse(storedString)
    } catch {
      this.fields = []
    }
    //this clears the old object version if needed
    if (!Array.isArray(this.fields)) {
      this.fields = []
    }
    this.update()
    localStorage.setItem(UtmFields.localStorageId, JSON.stringify(this.fields))
  }

  public getUtmRecord = () => {
    const record: Record<string, string> = {}
    const parsedQueryString = document.location.search.split('?')[1]?.split('&') ?? []
    parsedQueryString.map((item) => {
      const [fullKey, value] = item?.split('=')
      const [keyCategory, keyName] = fullKey.split('_')
      if (keyCategory === 'utm') {
        record[keyName] = value
      }
    })
    return Object.keys(record).length > 0 ? record : null
  }

  //check the query string and if there an new/updated utm values, add them to the fields
  public update() {
    const record = this.getUtmRecord()
    if (record) {
      if (!isEqual(this.fields[this.fields.length - 1], record)) {
        this.fields.push(record)
      }
    }
    return this.fields ?? undefined
  }

  public toString() {
    return JSON.stringify(this.fields)
  }
}

export default UtmFields
