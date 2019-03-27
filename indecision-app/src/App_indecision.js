import React,{Component} from 'react';

class IndecisionApp extends Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions= this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state ={
            options: props.options //['thing one','thing two', 'thing four','thing five']
        }
    }

   handleDeleteOptions() {
       this.setState(()=> ({options:[] }));
   }

   handleDeleteOption(option) {
    console.log('hdo', option);
   }

   handlePick() {
    const newNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[newNum];
    alert(option);
   }

   handleAddOption(option) {
       
        if(option.trim().length <1) {
            return ' enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return ' this option already exists';
        }

        this.setState((prevState)=> ({options: prevState.options.concat(option) }));

   }

  render() {

    const title ="Indecision";
    const subtitle = "Put your life in hands  of computer";
    
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleAddOption={this.handleAddOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
     ) ;
  }
}


const Header = (props) => {
  return (
    <div>
    <h1> {props.title}</h1>
    {props.subtitle && <h2>{props.subtitle} </h2>}
  </div>
  );
}

Header.defaultProps = {
  title: ' some default'
}

const Action = (props) => {
  return (
    <div>
    <button 
    onClick={props.handlePick}
    disabled={!props.hasOptions}
    > 
    what should I do
    </button>
  </div>
  );
}

const Options = (props) => {
  return(
    <div>
    <button onClick={props.handleDeleteOptions}> Remove All</button>
  {props.options.map( option =>(
    <Option 
      key={option} 
      optionText={option} 
      handleDeleteOption ={props.handleDeleteOption}
      />)  )}
</div>
  );
}

const Option = (props) => {
  return (
    <div>
    {props.optionText}
  </div>
  );
}

class AddOption extends Component {

    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state ={
            error:undefined
        };
    }
  handleAddOption = (event) => {
    event.preventDefault();
    const option = event.target.option.value.trim();
    const error = this.props.handleAddOption(option);
    
    console.log('dan123' + error) ;
    
    this.setState(() => ({error}));
  }

  

  render(){
    return (
      <div>
          {this.state.error && <p> {this.state.error}</p>}
        <form onSubmit={this.handleAddOption }>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    ) ;
  }
}



IndecisionApp.defaultProps = {
  options: ['thing one','thing two', 'thing four','thing five']
}

export default IndecisionApp ;
