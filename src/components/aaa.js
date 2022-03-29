import Clipboard from 'clipboard';

new Clipboard('.btn');

const a = () => { 
    var message = "Copy this to the clipboard";
    return (
      <div>
        <button className="btn" data-clipboard-text={ message }> 
          Copy to Clipboard
        </button>
        <div>
          { message }
        </div>
      </div>
    )
}
export default a