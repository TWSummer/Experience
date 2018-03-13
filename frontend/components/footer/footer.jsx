import React from 'react';


export default (props) => {

  return (
    <footer className="footer">
      <div className='info-header'>
        Xperience.City was built by
      </div>
      <div className="author-information">
        <ul>
          <li className="author">Andrew Blum</li>
          <li className="github">
              <a href="https://github.com/andrewdblum"><i className="fab fa-github"></i></a>
          </li>
          <li className="linkedin">
            <a href="https://www.linkedin.com/in/andrew-blum/"><i className="fab fa-linkedin"></i></a>
          </li>
        </ul>

        <ul>
          <li className="author">Patrick Chao</li>
          <li className="github">
              <a href="https://github.com/Pchao93"><i className="fab fa-github"></i></a>
          </li>
          <li className="linkedin">
            <a href="https://linkedin.com/in/patrickchao14/"><i className="fab fa-linkedin"></i></a>
          </li>
        </ul>
        <ul>
          <li className="author">Theo Summer</li>
          <li className="github">
              <a href="https://github.com/TWSummer"><i className="fab fa-github"></i></a>
          </li>
          <li className="linkedin">
            <a href="https://www.linkedin.com/in/twsummer/"><i className="fab fa-linkedin"></i></a>
          </li>
        </ul>

      </div>
    </footer>
  );
};
