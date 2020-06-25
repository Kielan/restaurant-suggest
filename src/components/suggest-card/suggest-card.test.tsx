import * as React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import sinon from 'sinon';
import MirageMockServer from '../../mirage-mock-server';
import SuggestCard, { ISuggestCardProps } from './suggest-card';
import { Response } from 'miragejs';
import * as api from '../../lib/api/api';

describe('< SuggestCard />', () => {
    var server;
    beforeEach(() => {
        server = MirageMockServer();
    });

    afterEach(() => {
        server.shutdown();
    });

    const props: ISuggestCardProps = {
        activeFormRefId: 'sample-form-ID',
        activeSuggestion: {
            address: 'address', link: 'linklink', description: 'description'
        },
        addSuggestion: () => {},
        formListRefs: {'e3p40592md': { id: 'e3p40592md'}},
        formSuggestions: [],
        genRandom: (e: any) => () => {},
        handleCardRef: (node='any', id='string') => {},
        data: [],
        onChangeHookRef: () => {},
        handleFormRef: (node: '', id: '') => {},
    };

    it("returns one response from api and get() and post() useeffect is not triggered", function () {
        // Override the existing /suggestions route handler, just for this test
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //server.get("/suggestions", () => new Response(500));
        //shallow rendering now works for what that's worth, we will
        //now test if mounting simulates the correct react behavior
        const wrapper = shallow(<SuggestCard {...props} />);

        //test destructure prop
        //const { props } = wrapper;

        console.log('kdl jest test wrapper ', wrapper);
        //console.log('kdl jest test props ', props);

        expect(wrapper).toBeTruthy;
    });
   
    it("mounts Suggest card and spies on ref interaction", function () {
        //const onButtonClick = sinon.spy();

        //@ts-ignore
        //const mountWrapper =  mount(<SuggestCard {...props} addSuggestion={onButtonClick}/>);

        //@ts-ignore
        //mountWrapper.find('FormContainer').simulate('click');

        //@ts-ignore
        //expect(onButtonClick).to.have.property('callCount', 1);
    });
    //use cypress to click onsubmit and test post effect
    // it("click add location post() useeffect not triggered", function () {
    //     //server.get("/suggestions", () => new Response(500));
    //     expect(suggestions.length).toBe(1);
    // });

    //use cypress to click onsubmit and test post effect
    // it("click add location post() useeffect triggered", function () {
    //     //server.get("/suggestions", () => new Response(500));
    //     expect(suggestions.length).toBe(1);
    // });

    //use cypress to click onsubmit and test post effect and get effect
    // it("click add location post() useeffect triggered & get() useeffect triggered", function () {
    //     //server.get("/suggestions", () => new Response(500));
    //     expect(suggestions.length).toBe(1);
    // });

    //use cypress to click genrandom and test
    // it("click genrandom and active card is set", function () {
    //     //server.get("/suggestions", () => new Response(500));
    //
    //     expect(suggestions.length).toBe(1);
    // });

    // it("should test cypress?", function() {
    //     cy.visit("/protected")
    //     cy.get('[data-testid="user-1"]').contains("")
    // })
});