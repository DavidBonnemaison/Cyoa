export default ({ onClick }) => (
  <div onClick={onClick}>
    <style jsx>{`
      div {
        box-sizing: border-box;
        background: #ba0404;
        color: white;
        text-align: center;
        position: fixed;
        left: 50%;
        bottom: 0;
        font-size: 2em;
        padding: 1em;
        border-radius: 100%;
        font-family: monospace;
        width: 3em;
        height: 3em;
        line-height: 0.75em;
        margin-left: -1.5em;
        margin-bottom: -1.5em;
        cursor: pointer;
        transition: 200ms all ease-in-out;
        border: 0.1em solid #ba0404;
        z-index: 4;
      }
      div:hover {
        margin-bottom: 0;
        color: #ba0404;
        background: white;
      }
    `}</style>
    +
  </div>
);
