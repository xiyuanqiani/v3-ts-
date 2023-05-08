import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    // 找到对应名字的坐标
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
