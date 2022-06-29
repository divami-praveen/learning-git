import React from 'react'
import { act } from '@testing-library/react-hooks'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'

import useApi from '../custom_hooks/useApi'
//test
jest.mock('axios')

//new

interface apiObj {
    URL: string
    method: string
    params: string
    payLoad: unknown
    msg: string
}

const testObj1: apiObj = {
    URL: 'https://6295aff875c34f1f3b1f0944.mockapi.io/DummyData/',
    method: 'GET',
    params: '',
    payLoad: {},
    msg: '',
}
const testObj2: apiObj = {
    URL: 'https://6295aff875c34f1f3b1f0944.mockapi.io/DummyData/',
    method: 'POST',
    params: '',
    payLoad: {},
    msg: '',
}

const testObj3: apiObj = {
    URL: 'https://6295aff875c34f1f3b1f0944.mockapi.io/DummyData/',
    method: 'PUT',
    params: '',
    payLoad: {},
    msg: '',
}

const testObj4: apiObj = {
    URL: 'https://6295aff875c34f1f3b1f0944.mockapi.io/DummyData/',
    method: 'DELETE',
    params: '',
    payLoad: {},
    msg: '',
}

const testObj5: apiObj = {
    URL: 'https://6295aff875c34f1f3b1f0944.mockapi.io/DummyData/',
    method: 'default',
    params: '',
    payLoad: {},
    msg: '',
}

let result: any
const renderHook = (hook: any, param: any) => {
    function HookWrapper() {
        result = hook(param)
        return null
    }
    render(<HookWrapper />)
    return result
}

describe('axios mocking', () => {
    test('get data resolve', () => {
        result = renderHook(useApi, testObj1)

        const data1: any = [{ name: 'Abhilash' }, { name: 'divami' }]

        ;(axios.get as jest.Mock).mockResolvedValue({ data: data1 })

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj1)).resolves.toEqual(data1)
            })
        })
    })

    test('fail get data resolve', () => {
        result = renderHook(useApi, testObj1)

        const data1: any = [{ name: 'Abhilash' }, { name: 'divami' }]

        ;(axios.get as jest.Mock).mockRejectedValue({ data: data1 })

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj1)).resolves.toEqual(data1)
            })
        })
    })

    test('post data resolves', async () => {
        const data2 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.post as jest.Mock).mockResolvedValue(data2)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj2)).resolves.toEqual(data2)
            })
        })
    })

    test('put data resolves', async () => {
        const data3 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.put as jest.Mock).mockResolvedValue(data3)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj3)).resolves.toEqual(data3)
            })
        })
    })

    test('fail put data resolves', async () => {
        const data3 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.put as jest.Mock).mockRejectedValue(data3)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj3)).resolves.toEqual(data3)
            })
        })
    })

    test('delete data resolves', async () => {
        const data4 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.delete as jest.Mock).mockResolvedValue(data4)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj4)).resolves.toEqual(data4)
            })
        })
    })

    test('fail delete data resolves', async () => {
        const data4 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.delete as jest.Mock).mockRejectedValue(data4)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj4)).resolves.toEqual(data4)
            })
        })
    })

    test('default data resolves', async () => {
        const data5 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.delete as jest.Mock).mockRejectedValue(data5)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj5)).resolves.toEqual(data5)
            })
        })
    })

    test('fail post data resolves', async () => {
        const data5 = { title: 'hello', desc: 'have a nice day' }
        ;(axios.post as jest.Mock).mockRejectedValue(data5)

        waitFor(() => {
            act(() => {
                expect(result.doApi(testObj2)).resolves.toEqual(data5)
            })
        })
    })
})
