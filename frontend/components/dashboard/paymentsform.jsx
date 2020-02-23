import React from 'react';
import { connect } from 'react-redux';
import { createPayment, fetchBills } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';

class PaymentsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: null,
            payer_id: null, //user foreign key
            bill_id: null, // bill foreign key
            lender: null,
            borrower: null,

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.selectedBill = this.selectedBill.bind(this)
    }

    selectedBill(e) {
        this.setState({ 
            bill_id: e.target.value,
            payer_id: this.props.bills[e.target.value].borrower_id,
            lender: this.props.bills[e.target.value].lender,
            borrower: this.props.bills[e.target.value].borrower
            
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        
        this.props.createPayment({
            payer_id: this.state.payer_id,
            bill_id: this.state.bill_id,
            amount: this.state.amount * 100,
        }, this.state.bill_id)
        // this.props.fetchBills() 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bills != this.props.bills) {
            // this.props.closeModal()
        }
    }

    update(field) {
        // console.log(this.state)
        return e => this.setState({
            [field]: e.target.value
        })
    }


    allowSubmit() {

        if (this.state.amount != null &&
            this.state.payer_id != null &&
            this.state.bill_id != null ) {
            return (<input className='greenbutton' type="submit" value="Save" ></input>)
        } else {
            return (<input className='greenbutton disabled' type="submit" value="Save" disabled="true"></input>)
        }

    }

    componentDidMount(){
        this.props.fetchBills()
    }

    render() {

        return (
            <div className="addfriend-form"> <div id="formheader">Settle up</div>
                <form onSubmit={this.handleSubmit}>
                    
                    
                    <span style={{ left: `10px`, position: `absolute` }}>Find a bill <span className='STRONG'>YOU</span> are in&nbsp;
                    <select onChange={this.selectedBill.bind(this)}>
                            <option value={null}>Choose a bill</option>
                            {this.props.bills.map(bill => (
                                    <option value={bill.id} key={bill.id}>{bill.lender} lent ${bill.amount/100} to {bill.borrower}</option>
                                )
                            )
                            }
                        </select>
                        </span>
                    <br />
                    <img src={window.orangedude} style={{height: `50px`}}></img>
                    <img src={window.arrow} style={{ height: `50px` }}></img>
                    <img src={window.greendude} style={{height: `50px`}}></img>
                  
                  
                  
                    <div style={{ margin: `5px 33px 5px 33px`, position: 'relative', display: `block` }}>

                        $<input className="unfocus" onChange={this.update(`amount`)} type='text' style={{
                            width: `40%`, padding: `4px 3px 2px 3px`, display: `inline-block`,
                            fontSize: `40px`, boxShadow: `none`,
                            border: `none`, borderBottom: `1px dashed #CCCCCC`
                        }} placeholder='0.00'></input>
                    </div>

                    <button className='cancel' onClick={this.props.closeModal}>Cancel</button>
                    {this.allowSubmit()}
                </form>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        current_user: state.entities.users[state.session.id],
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        createPayment: (payment) => dispatch(createPayment(payment)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(PaymentsForm)


