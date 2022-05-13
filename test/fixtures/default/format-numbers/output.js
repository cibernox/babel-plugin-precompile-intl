import { __number } from "precompile-intl-runtime";
export default {
  nearby: "Find places near your location",
  regular: count => `I have ${__number(count)} cats`,
  customFormat: blackCount => `Almost ${__number(blackCount, "custom")} of them are black.`,
  percentage: blackCount => `Almost ${__number(blackCount, {
    style: "percent"
  })} of them are black.`,
  percentageWithTwoDecimals: blackCount => `Almost ${__number(blackCount, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} of them are black.`,
  percentageWithScale: blackCount => `Almost ${__number(blackCount / 0.01, {
    style: "percent",
    maximumFractionDigits: 2
  })} of them are black.`,
  rounded: price => `The dress I liked was ${__number(price)}`,
  currency: balance => `Account balance ${__number(balance, {
    style: "currency",
    currency: "EUR"
  })}`,
  scientific: distance => `Distance to star ${__number(distance, {
    notation: "scientific"
  })}`,
  scientificSigned: distance => `Distance to star ${__number(distance, {
    notation: "scientific",
    signDisplay: "always"
  })}`,
  engineeringSigned: distance => `Distance to star ${__number(distance, {
    notation: "engineering",
    signDisplay: "always"
  })}`,
  complexMeasurementUnit: distance => `Distance to destination: ${__number(distance, {
    style: "unit",
    unit: "km"
  })}`,
  bossLevel: initialFee => `${__number(initialFee, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    trailingZeroDisplay: "stripIfInteger",
    style: "currency",
    currency: "GBP"
  })} annual fee`
};