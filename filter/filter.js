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
        this.setState({checkboxState: EO.target.checked}, this.sortArray);
    },

    inputTextChanged: function(EO){
        this.setState({inputTextValue: EO.target.value}, this.sortArray);
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

        let verticalList = this.state.textAreaValue.map((v, index) => 
            React.DOM.li({key: index}, v));

        return React.DOM.div({className:'Filter'}, 
                React.DOM.div({className:'Block1'},
                    React.DOM.input({type:'checkbox', 
                                    checked: this.state.checkboxState,
                                    onChange: this.checkBoxChanged}),
                    React.DOM.input({type:'text', 
                                    value: this.state.inputTextValue, 
                                    onChange: this.inputTextChanged}),
                    React.DOM.button({onClick: this.setDefaultValues}, 'Reset')
                    ),
                React.DOM.div({className:'VerticalList'}, 
                    React.DOM.ul(null, verticalList))
                );
    },
});



