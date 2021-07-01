import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it("should contain token if auth success", () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS ,
            idToken:"hukka-hua",
            userId:"hukka-vua"
        })).toEqual({
            token: "hukka-hua",
            userId: "hukka-vua",
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })


})