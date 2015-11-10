var ToDo = React.createClass({
    render: function() {
        return (
            <li>{this.props.todo}</li>
       );
    }
});

var ToDoList = React.createClass({
    render: function() {
        var todos = [];
        for (var todo of this.props.todos) {
            todos.push(<ToDo todo={todo} />); 
        }
        return (
            <div>
                <ol>
                    {todos}
                </ol>
            </div>
        );
    }
});

var TodoApp = React.createClass({
    getInitialState: function() {
        request("GET", "/todos", function(err, resp) {
            this.setState({todos: JSON.parse(resp.body)});
        }.bind(this));
        return {todos: []}
    },
    addTodo: function() {        
        var todo = this.refs.todoBox.value;  
        request("POST", "/todos", {'json': {'todo': todo}});
        this.setState({
            todos: this.state.todos.concat([todo])
        });
    },
    render: function() {
        return (
            <div>
                <input type="text" ref="todoBox"/>
                <input type="submit" onClick={this.addTodo}/>
                <br/>
                <ToDoList todos={this.state.todos} />
            </div>
       );
    }
});

ReactDOM.render((<TodoApp />), document.getElementById("content"));
