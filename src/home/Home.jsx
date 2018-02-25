import React from 'react';

import thumbnail from './resource/thumbnail.png';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render()  {
        return (  
            <div className="body-content">
                <h1>36베이스</h1>
                <p>Development Status.......40%</p>
                <p>고3 수능준비 안하고 만들고있음</p>
                <p>엄청난 성원은 고마워 다들</p>
                <p>빵갤럼들이 원하는 기능 많이많이 만들어줄께</p>
                <img style={{width: '450px'}} src={thumbnail} />
            </div>
        );
    };

}
