import { PAGE_TIMELINE, HOURS_IN_DAY, SECONDS_IN_HOUR, SECONDS_IN_MINUTES, MINUTES_IN_HOUR, MILLISECONDS_IN_SECOND } from './constants';
import { isPageValid, isNull } from './validators';

export function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if(isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}

export function generateTimelineItems (activities) {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR,
  }))
}

export function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generateActivities() {
  return ['Codding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplite: hours * SECONDS_IN_HOUR
  }))
}

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectOptions(periodsInMinutes) {

  return periodsInMinutes.map((periodInMinutes) =>  ({
      value: periodInMinutes * SECONDS_IN_MINUTES,
      label: generatePeriodSelectOptionsLabel(periodInMinutes),
    }
  ))
}

function generatePeriodSelectOptionsLabel(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR).toString().padStart(2, 0)
  const minutes = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, 0)
  return `${hours}:${minutes}`
}

export function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2,  utc.indexOf(':') + 6)
}


 