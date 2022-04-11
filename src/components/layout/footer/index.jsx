
  import classes from './index.module.css'

  const helpfulLinks = [
    { title: 'My Account' },
    { title: 'Hospital Your Event' },
    { title: 'Refunds and Exchanges' },
    { title: 'Get Help' },
    { title: 'Sell' },
    { title: 'Gift Cards' },
    { title: 'N.Y Registered Brokers' },
    { title: 'Do Not Sell My Information' },
  ]
const ourNetworks = [
    { title: 'House of Blues' },
    { title: 'Front Gate Hospitals' },
    { title: 'Hospital Web' },
    { title: 'HospitalWeb' },
    { title: 'NBAHospitalS.com' },
    { title: 'Hospital Exchange' },
]
const aboutUss = [
    { title: 'Hospital Blog' },
    { title: 'Hospital 101' },
    { title: 'Privacy Policy' },
    { title: 'Work With Us' },
    { title: 'Across the Globe' },
    { title: 'Innovation' },
]
const friendsPartners = [
    { title: 'Greater' },
    { title: 'Allianz' },
    { title: 'AWS' },
]

export default function Footer() {
    return (
        <div className={`${classes.footer} ${classes.footerBg}`}>
            <div className={classes.footerItemField}>
                <div className={classes.footerItem}>
                    <div className={classes.footerTitlefield}>
                        <h5 className={classes.footerTitle}>Helpful Links</h5>
                        <img alt='' className={classes.footerTitleLine} src="/images/bottom-line.png" />
                    </div>
                    {helpfulLinks.map((helpfulLink) => (
                        <div key={helpfulLink.title} className={classes.footerTextItem}>
                            <img alt='' className={classes.footerTextIcon} src="/images/select-allow.png" />
                            <span className={classes.footerText}>{helpfulLink.title}</span>
                        </div>
                    ))}
                </div>
                <div className={classes.footerItem}>
                    <div className={classes.footerTitlefield}>
                        <h5 className={classes.footerTitle}>Our Network</h5>
                        <img alt='' className={classes.footerTitleLine} src="/images/bottom-line.png" />
                    </div>
                    {ourNetworks.map((ourNetwork) => (
                        <div key={ourNetwork.title} className="d-flex jsutify-contnet-start align-items-center cursor-pointer footer-text-item">
                            <img alt='' className={classes.footerTextIcon} src="/images/select-allow.png" />
                            <span className={classes.footerText}>{ourNetwork.title}</span>
                        </div>
                    ))}
                </div>
                <div className={classes.footerItem}>
                    <div className={classes.footerTitlefield}>
                        <h5 className={classes.footerTitle}>About Us</h5>
                        <img alt='' className={classes.footerTitleLine} src="/images/bottom-line.png" />
                    </div>
                    {aboutUss.map((aboutUs) => (
                        <div key={aboutUs.title} className="d-flex jsutify-contnet-start align-items-center cursor-pointer footer-text-item">
                            <img alt='' className={classes.footerTextIcon} src="/images/select-allow.png" />
                            <span className={classes.footerText}>{aboutUs.title}</span>
                        </div>
                    ))}
                </div>
                <div className={classes.footerItem}>
                    <div className={classes.footerTitlefield}>
                        <h5 className={classes.footerTitle}>Friends & Partners</h5>
                        <img alt='' className={classes.footerTitleLine} src="/images/bottom-line.png" />
                    </div>
                    {friendsPartners.map((friendsPartner) => (
                        <div key={friendsPartner.title} className="d-flex jsutify-contnet-start align-items-center cursor-pointer footer-text-item">
                            <img alt='' className={classes.footerTextIcon} src="/images/select-allow.png" />
                            <span className={classes.footerText}>{friendsPartner.title}</span>
                        </div>
                    ))}
                    <div className="d-flex justify-content-start align-items-center footer-ourApp-text-title">
                        <h5 className={classes.footerTitle}>Get Our App</h5>
                        <img alt='' className={classes.ourAppIcon} src="/images/apple.png" />
                        <img alt='' className={classes.ourAppIcon} src="/images/Unity.png" />
                    </div>
                </div>
            </div>
            <img alt='' className={classes.divider} src="/images/Rectangle 40.png" />
            <div className={classes.footerLogoField}>
                <img alt='' className={classes.logoImg} src="/images/logo.png" />
                <div className={classes.socialIconField}>
                    <img alt='' className={classes.socialIcon} src="/images/Group 43.png" />
                    <img alt='' className={classes.socialIcon} src="/images/Group 47.png" />
                    <img alt='' className={classes.socialIcon} src="/images/Group 44.png" />
                    <img alt='' className={classes.socialIcon} src="/images/Group 46.png" />
                    <img alt='' className={classes.socialIcon} src="/images/Group 45.png" />
                </div>
            </div>
            <img alt='' className={classes.divider} src="/images/Rectangle 40.png" />
            <div className={classes.footerBottom}>
                <span className={classes.footerBottomText}>By continuing past this page, you agree to our Terms of Use.</span>
                <div className={classes.dFlex}>
                    <span className={classes.footerBottomText}>@Hospital 2021</span>
                    <img alt='' className={classes.borderVertical} src="/images/Rectangle 42.png" />
                    <div className={classes.dFlex}>
                        <img alt='' className={classes.flagIcon} src="/images/flag-400.png" />
                        <span className={classes.footerBottomText}>Israel</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
            