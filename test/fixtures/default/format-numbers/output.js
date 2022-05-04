import { __number } from "precompile-intl-runtime";
export default {
  nearby: "Find places near your location",
  regular: count => `I have ${__number(count)} cats`,
  percentage: blackCount => `Almost ${__number(blackCount, {
    style: "percent"
  })} of them are black.`,
  percentageWithTwoDecimals: blackCount => `Almost ${__number(blackCount, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} of them are black.`,
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
  scientificSignedWith2Exponent: distance => `Distance to star ${__number(distance, {
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