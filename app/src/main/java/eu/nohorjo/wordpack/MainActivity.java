package eu.nohorjo.wordpack;

import android.app.Activity;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends Activity {

    //declaration
    private WebView frame;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //this is the reference for the webview in layout/activity_main.xml.
        frame = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = frame.getSettings();

        //need javascript in the Webview? don't comment this out.
        webSettings.setJavaScriptEnabled(true);

        //this setting here is to prevent the Webview from opening links in a new window.
        frame.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                view.loadUrl(url);
                return true;
            }
        });

        frame.loadUrl("http://wordpack.nohorjo.eu");
    }
}
