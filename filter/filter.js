let filter = React.createClass({

    displayName: 'filterComponent',
    propTypes:{
        defaultwords: React.PropTypes.arrayOf(React.PropTypes.string).isRequired    
    },

    getInitialState: function() {
        return { 
            textAreaValue: this.props.defaultwords,
            checkboxState: false,
            inputTextValue:'',
            defaultList: this.props.defaultwords
        };
      },

    checkBoxChanged: function(EO) {
        this.state.checkboxState = EO.target.checked;
        this.sortArray();
      },

    inputTextChanged: function(EO){
        this.state.inputTextValue = EO.target.value;
        this.sortArray();
    },

    sortArray: function(){
        let currentValue = this.state.defaultList.slice();

        if(this.state.inputTextValue === ''){
            this.setState({textAreaValue: this.state.checkboxState ? currentValue.sort() : currentValue});
        }
        else{
            let result = currentValue.filter(item => item.includes(this.state.inputTextValue) === true);
            this.setState({textAreaValue: this.state.checkboxState ? result.sort() : result});
        }
    },

    setDefaultValues: function(){
        this.setState({
            checkboxState: false, 
            inputTextValue: '', 
            textAreaValue: this.state.defaultList
        });
    },

    render: function(){

        let verticalList = this.state.textAreaValue.map(v => 
            React.DOM.li(null, v));

        return React.DOM.div({className:'Filter'}, 
                React.DOM.div({className:'Block1'},
                    React.DOM.input({type:'checkbox', 
                                    defaultChecked: this.state.checkboxState,
                                    checked: this.state.checkboxState,
                                    onChange: this.checkBoxChanged}),
                    React.DOM.input({type:'text', 
                                    defaultValue: this.state.inputTextValue,
                                    value: this.state.inputTextValue, 
                                    onChange: this.inputTextChanged}),
                    React.DOM.button({onClick: this.setDefaultValues}, 'Reset')
                    ),
                React.DOM.div({className:'VerticalList'}, 
                    React.DOM.ul(null, verticalList))
                );
    },
});



