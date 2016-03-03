package com.abee.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Application Lifecycle Listener implementation class SimpleSessionListener
 *
 */
@WebListener
public class SimpleSessionListener implements HttpSessionListener {

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent arg0) {
        System.out.println(arg0.getSession().getId() + "**************************Created Session**********************************");
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent arg0) {
    
    	System.out.println(arg0.getSession().getId() + "**************************Session Destroyed**********************************");
    }
	
}
