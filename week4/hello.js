var Hello = React.createClass({
    render: function() {
        return (
            <h1>Hello, world!</h1>
        );
    }
});

ReactDOM.render((<Hello />), document.getElementById("content"));
