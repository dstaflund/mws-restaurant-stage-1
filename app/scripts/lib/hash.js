export default class Hash {

  // Hash function taken from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  static hash(value){
    if (value.length === 0) return 0;

    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      const chr   = value.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }
}
