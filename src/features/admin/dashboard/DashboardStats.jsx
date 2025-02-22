import './DashboardStats.css'
const DashboardStats = ({title, number, icon, trend, trendNumber, trendDescription}) => {
  return (
    <div className='dashboard__stats card'>
      <div className='card__header'>
        <div className='card__info'>
          <span className='card__title'>{title}</span>
          <span className='card__number'>{number}</span>
        </div>
        <div className='card__icon'>
          <img src={icon} alt='Users Icon' />
        </div>
      </div>
      <div className='card__footer'>
        <span className={`card__trend card__trend--${trend}`}>{trendNumber}</span>
        <span className='card__description'>{trendDescription}</span>
      </div>
    </div>
  )
}

export default DashboardStats