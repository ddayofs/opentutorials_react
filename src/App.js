import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
    console.log('props', props.title)
    return (
        <header>
            <h1><a href="/" onClick={(event)=>{
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    )    
}

function Nav(props) {
    const lis = []
    for (let i=0; i<props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}><a href={'/read'+t.id} id={t.id}onClick={(event)=> {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
        }}>{t.title}</a></li>)
    }
    return (
        <nav>
            <ol>
                {lis}
            </ol>
        </nav>
    )
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    )
}

function Create(props) {
    return <article>
        <h2>Create</h2>
        <form onSubmit={event=>{
            event.preventDefault();
            const title = event.target.title.value; //해당 event를 발생시킨 태그 중 name이 title인 태그의 value값을 가져온다
            const body = event.target.body.value;
            props.onCreate(title,body);
        }}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p><textarea name="body" placeholder="body"></textarea></p>
            <p><input type="submit" value="Create"></input></p>
        </form>
    </article>
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'javascript', body:'javascript is ...'},
    ]);

    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title='WELCOME' body='Hello, WEB'></Article>;
    } else if(mode === 'READ') {
        let title, body = null;
        for(let i = 0; i < topics.length; i++) {
            console.log(id,topics[i].id);
            if (id === topics[i].id){
                title = topics[i].title;
                body = topics[i].body;
                break;
            }
        }
        content = <Article title={title} body={body}></Article>;
    } else if(mode === 'CREATE') {
        content=<Create onCreate={(_title,_body )=>{
            const newTopic= {id:nextId, title:_title, body:_body}
            const newTopics = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode('READ');
            setId(nextId);
            setNextId(nextId + 1);

        }}></Create>
    }
        
  return (
    <div>
        <Header title="WEB" onChangeMode={function(){
            // alert('Header');
            setMode('WELCOME');
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
            // alert(id);
            setMode('READ');
            setId(_id);
        }}></Nav>
        {/* <Article title="I am props.title"body= "I am props.body"></Article> */}
        {/* <Article title="Welcome"body= "Hello, Web"></Article> */}
        {content}
        <a href="/create" onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
        }}>Create</a>
    </div>
  );
}

export default App;
