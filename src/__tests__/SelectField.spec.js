import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect, { createSpy } from 'expect'
import expectJsx from 'expect-jsx'
import SelectField from 'material-ui/SelectField'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import noop from 'lodash.noop'
import ReduxFormMaterialUISelectField from '../SelectField'

expect.extend(expectJsx)

describe('SelectField', () => {
  it('has a display name', () => {
    expect(ReduxFormMaterialUISelectField.displayName)
      .toBe('ReduxFormMaterialUISelectField')
  })

  it('renders a SelectField', () => {
    expect(new ReduxFormMaterialUISelectField({
      input: {
        name: 'mySelect',
        value: 'Foo'
      }
    }).render())
      .toEqualJSX(<SelectField name="mySelect" value="Foo" onChange={noop} ref="component"/>)
  })

  it('renders a SelectField with no error when not touched', () => {
    expect(new ReduxFormMaterialUISelectField({
      input: {
        name: 'mySelect',
        value: 'Foo'
      },
      meta: {
        error: 'FooError'
      }
    }).render())
      .toEqualJSX(<SelectField name="mySelect" value="Foo" onChange={noop} ref="component"/>)
  })

  it('renders a SelectField with an error', () => {
    expect(new ReduxFormMaterialUISelectField({
      input: {
        name: 'mySelect',
        value: 'Foo'
      },
      meta: {
        error: 'FooError',
        touched: true
      }
    }).render())
      .toEqualJSX(<SelectField name="mySelect" value="Foo" errorText="FooError" onChange={noop}
        ref="component"/>)
  })

  it('maps onChange properly', () => {
    const onChange = createSpy()

    const dom = TestUtils.renderIntoDocument(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <ReduxFormMaterialUISelectField name="mySelect" input={{ onChange, value: 'Foo' }}/>
      </MuiThemeProvider>
    )

    const select = TestUtils.findRenderedComponentWithType(dom, SelectField)
    expect(onChange).toNotHaveBeenCalled()
    select.props.onChange(undefined, 42, 'TheValue')
    expect(onChange)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('TheValue')
  })

  it('provides getRenderedComponent', () => {
    const dom = TestUtils.renderIntoDocument(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <ReduxFormMaterialUISelectField input={{ name: 'mySelect' }}/>
      </MuiThemeProvider>
    )

    const element =
      TestUtils.findRenderedComponentWithType(dom, ReduxFormMaterialUISelectField)
    expect(element.getRenderedComponent).toBeA('function')
    expect(element.getRenderedComponent()).toExist()
  })
})

