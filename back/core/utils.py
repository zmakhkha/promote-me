import logging 


def getLogging():
    logging.basicConfig(filename="message.log", 
                    format='%(asctime)s: %(levelname)s: %(message)s', 
                    level=logging.INFO) 
    return(logging)