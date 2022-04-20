import classes from "./TestLists.module.css"

const TestLists = (props) => {
    const selectPatientTests = props.selectPatientTests;
    return (
        <div className={classes.testLists}>
            <div className={classes.title}>Patient Test Lists</div>
            <div className={classes.body}>
                { selectPatientTests ? 
                    selectPatientTests.map((item, i) => (
                        <div key={i} className={classes.item}>
                            <div className={classes.item_id}>{i+1}</div>
                            <div className={classes.item_name}>{item.testName}</div>
                        </div>
                    )) 
                    : <div>No Tests</div>
                }
            </div>
        </div>
    )
}
export default TestLists