const request = require('request-promise-native')
const clock = require ('node-schedule')
var notification = {
  method: "POST",
  uri: "https://exp.host/--/api/v2/push/send",
  headers: {
    "accept": "application/json",
    "accept-encoding": "gzip, deflate",
    "content-type": "application/json"
  },
  body: JSON.stringify({
  "to" : "ExponentPushToken[GYAFRaNxhPsASqDq71pH2O]",
  "title": "It's going to rain tomorrow",
  "body":"Bring an Umbrella"

  }),
}


var apiCall = {
  method: 'GET',
  uri: 'https://api.darksky.net/forecast/a65365d560068914bfaa9dd989ba2c06/40.705258469492787,-74.00922974507341?exclude=minutely,daily,alerts,flags',
}


rule = new clock.RecurrenceRule()
rule.hour = 12
rule.minute = 15
var job = clock.scheduleJob(rule, async () => {
  try {
  let json = await request(apiCall)
  let data = JSON.parse(json)
  if(checkForRain(1, 12, data.hourly.data)){
    return request(notification)
  .then(res => {
    console.log("WOOO", res)
  })
  .catch(err => {
    console.log("Damn", err)
  })
  }
  console.log("it's apparently not raining")
  } catch (err) {
  console.log('not working', err)
  }


}
)

function checkForRain(start, hours, data, chance = .3){
    console.log(data)
    for (let i = start; i<hours+start; i++) {
      if (data[i].precipProbability >= chance && data[i].precipType === 'rain')
        return true
    }
    return false
  }


module.exports = job
