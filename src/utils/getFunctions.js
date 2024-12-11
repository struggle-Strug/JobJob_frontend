import { prefectures } from "./constants/categories";
import { JobType as jobTypes } from "./constants/categories";
import { EmploymentType as employmentTypes } from './constants/categories/employmenttype';

export const getPrefectureKeyByValue = (value) => {
    for (const region in prefectures) {
        for (const key in prefectures[region]) {
            if (prefectures[region][key] === value) {
                return key; // Return the key if the value matches
            }
        }
    }
    return null; // Return null if no match is found
}

export const getJobTypeKeyByValue = (value) => {
    for (const category in jobTypes) {
        for (const job in jobTypes[category]) {
            if (jobTypes[category][job] === value) {
                return job; // Return the job key if the value matches
            }
        }
    }
    return null; // Return null if no match is found
}

export const getEmploymentTypeKeyByValue = (value) => {
    for (const type in employmentTypes) {
        if (employmentTypes[type] === value) {
            return type; // Return the employment type key if the value matches
        }
    }
    return null; // Return null if no match is found
}

