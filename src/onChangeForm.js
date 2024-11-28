import { State, useState } from 'react'

export function onChangeForm (event, modState) {
    const name = event.target.name;
    const value = event.target.value;
    // Set the values in [Key,Value] pairs
    modState(values => ({...values, [name]: value}))
}